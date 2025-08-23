"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"
import { Trash2, Edit, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface MerchItem {
  id: string
  title: string
  description: string
  image_url: string
  created_at: string
}

export default function MerchManagement() {
  const [items, setItems] = useState<MerchItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingItem, setEditingItem] = useState<MerchItem | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
  })

  const supabase = createClient()

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    const { data, error } = await supabase.from("merch_items").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching items:", error)
    } else {
      setItems(data || [])
    }
    setIsLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("[v0] Form submitted with data:", formData)

    if (editingItem) {
      // Update existing item
      console.log("[v0] Updating item with ID:", editingItem.id)
      const { data, error } = await supabase.from("merch_items").update(formData).eq("id", editingItem.id)

      if (error) {
        console.error("[v0] Error updating item:", error)
        alert(`Error updating item: ${error.message}`)
      } else {
        console.log("[v0] Item updated successfully:", data)
        fetchItems()
        resetForm()
      }
    } else {
      // Create new item
      console.log("[v0] Creating new item")
      const { data, error } = await supabase.from("merch_items").insert([formData])

      if (error) {
        console.error("[v0] Error creating item:", error)
        alert(`Error creating item: ${error.message}`)
      } else {
        console.log("[v0] Item created successfully:", data)
        fetchItems()
        resetForm()
      }
    }
  }

  const handleEdit = (item: MerchItem) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      image_url: item.image_url,
    })
    setIsEditing(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this item?")) {
      console.log("[v0] Deleting item with ID:", id)
      const { data, error } = await supabase.from("merch_items").delete().eq("id", id)

      if (error) {
        console.error("[v0] Error deleting item:", error)
        alert(`Error deleting item: ${error.message}`)
      } else {
        console.log("[v0] Item deleted successfully:", data)
        fetchItems()
      }
    }
  }

  const resetForm = () => {
    setFormData({ title: "", description: "", image_url: "" })
    setEditingItem(null)
    setIsEditing(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl font-mono">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button variant="outline" size="sm" className="border-gray-700 text-white hover:bg-gray-800 bg-transparent">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-mono">MERCH MANAGEMENT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white font-mono">
                {editingItem ? "Edit Item" : "Add New Item"}
                {editingItem && (
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    size="sm"
                    className="ml-4 border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                  >
                    Cancel
                  </Button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="title" className="text-white">
                    Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-white">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image_url" className="text-white">
                    Image URL
                  </Label>
                  <Input
                    id="image_url"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                  {editingItem ? "Update Item" : "Add Item"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Items List */}
          <div className="space-y-4">
            <h2 className="text-xl font-mono text-white">Current Items ({items.length})</h2>
            {items.length === 0 ? (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6 text-center text-gray-400">No items found</CardContent>
              </Card>
            ) : (
              items.map((item) => (
                <Card key={item.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={item.image_url || "/placeholder.svg"}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded bg-gray-800"
                      />
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{item.title}</h3>
                        <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleEdit(item)}
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(item.id)}
                          variant="outline"
                          size="sm"
                          className="border-red-700 text-red-400 hover:bg-red-900 bg-transparent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
