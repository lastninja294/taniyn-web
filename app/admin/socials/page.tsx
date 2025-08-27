"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { Trash2, Edit, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Social {
  id: string;
  title: string;
  url: string;
  icon_name: string;
}

export default function SocialsManagement() {
  const [socials, setSocials] = useState<Social[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingSocial, setEditingSocial] = useState<Social | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    icon_name: "",
  });

  const supabase = createClient();

  useEffect(() => {
    fetchSocials();
  }, []);

  const fetchSocials = async () => {
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching socials:", error);
    } else {
      setSocials(data || []);
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Form submitted with data:", formData);

    if (editingSocial) {
      console.log("[v0] Updating social with ID:", editingSocial.id);
      const { data, error } = await supabase
        .from("social_links")
        .update(formData)
        .eq("id", editingSocial.id);

      if (error) {
        console.error("[v0] Error updating social:", error);
        alert(`Error updating social: ${error.message}`);
      } else {
        console.log("[v0] Social updated successfully:", data);
        fetchSocials();
        resetForm();
      }
    } else {
      console.log("[v0] Creating new social");
      const { data, error } = await supabase
        .from("social_links")
        .insert([formData]);

      if (error) {
        console.error("[v0] Error creating social:", error);
        alert(`Error creating social: ${error.message}`);
      } else {
        console.log("[v0] social created successfully:", data);
        fetchSocials();
        resetForm();
      }
    }
  };

  const handleEdit = (social: Social) => {
    setEditingSocial(social);
    setFormData({
      title: social.title,
      icon_name: social.icon_name,
      url: social.url,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this social?")) {
      console.log("[v0] Deleting social with ID:", id);
      const { data, error } = await supabase
        .from("social_links")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("[v0] Error deleting social:", error);
        alert(`Error deleting social: ${error.message}`);
      } else {
        console.log("[v0] Social deleted successfully:", data);
        fetchSocials();
      }
    }
  };

  const resetForm = () => {
    setFormData({ title: "", url: "", icon_name: "" });
    setEditingSocial(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-xl font-mono">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin">
            <Button
              variant="outline"
              size="sm"
              className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-3xl font-mono">SOCIAL MANAGEMENT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white font-mono">
                {editingSocial ? "Edit Social" : "Add New Social"}
                {editingSocial && (
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
                    Social Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="venue" className="text-white">
                    Url
                  </Label>
                  <Input
                    id="url"
                    value={formData.url}
                    onChange={(e) =>
                      setFormData({ ...formData, url: e.target.value })
                    }
                    className="bg-gray-800 border-gray-700 text-white"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-gray-200"
                >
                  {editingSocial ? "Update Social" : "Add Social"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Socials List */}
          <div className="space-y-4">
            <h2 className="text-xl font-mono text-white">
              Upcoming Socials ({socials.length})
            </h2>
            {socials.length === 0 ? (
              <Card className="bg-gray-900 border-gray-800">
                <CardContent className="p-6 text-center text-gray-400">
                  No socials found
                </CardContent>
              </Card>
            ) : (
              socials.map((social) => (
                <Card key={social.id} className="bg-gray-900 border-gray-800">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold text-lg">
                          {social.title}
                        </h3>
                        <p className="text-gray-300 text-sm mt-1">
                          {social.url}
                        </p>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          onClick={() => handleEdit(social)}
                          variant="outline"
                          size="sm"
                          className="border-gray-700 text-white hover:bg-gray-800 bg-transparent"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(social.id)}
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
  );
}
