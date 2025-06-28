"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import {
  Settings,
  User,
  Bell,
  Shield,
  Database,
  Mail,
  Smartphone,
  Save,
  Eye,
  EyeOff,
  Trash2,
  Download,
} from "lucide-react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useRouter } from "next/navigation"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  })
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteConfirmation, setDeleteConfirmation] = useState("")
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleSaveProfile = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    })
  }

  const handleUpdatePassword = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully.",
    })
  }

  const handleSaveNotifications = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated.",
    })
  }

  const handleSaveBusinessSettings = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setLoading(false)
    toast({
      title: "Business Settings Updated",
      description: "Your business information has been saved successfully.",
    })
  }

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "DELETE") {
      return
    }

    try {
      const response = await fetch("/api/auth/delete-account", {
        method: "DELETE",
      })

      if (response.ok) {
        toast({
          title: "Account Deleted",
          description: "Your account has been permanently deleted.",
          variant: "destructive",
        })
        router.push("/login")
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: `Error deleting account: ${error.message}`,
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error deleting account:", error)
      toast({
        title: "Error",
        description: "An error occurred while deleting your account. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleExportData = async () => {
    try {
      const response = await fetch("/api/auth/export-data")

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `signtrack-data-export-${new Date().toISOString().split("T")[0]}.json`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
        toast({
          title: "Data Exported",
          description: "Your data has been exported successfully.",
        })
      } else {
        toast({
          title: "Export Failed",
          description: "Error exporting data. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error exporting data:", error)
      toast({
        title: "Export Failed",
        description: "An error occurred while exporting your data. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-500">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-gray-500 to-slate-500 rounded-lg">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-600 to-slate-600 bg-clip-text text-transparent">
              Settings
            </h1>
          </div>
          <p className="text-gray-600 text-lg">Manage your account and application preferences.</p>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Profile Settings */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-xl font-bold text-gray-800">Profile Settings</CardTitle>
            </div>
            <CardDescription className="text-gray-600">
              Update your personal information and account details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" defaultValue="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" defaultValue="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="john@example.com" defaultValue="john@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" placeholder="+91 98765 43210" defaultValue="+91 98765 43210" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input id="company" placeholder="Your Studio" defaultValue="SignTrack Business" />
            </div>
            <Button
              onClick={handleSaveProfile}
              disabled={loading}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Saving..." : "Save Profile"}
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-red-50 to-pink-50 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-red-600" />
              <CardTitle className="text-xl font-bold text-gray-800">Security Settings</CardTitle>
            </div>
            <CardDescription className="text-gray-600">Manage your password and security preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" placeholder="Enter new password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="twoFactor" />
              <Label htmlFor="twoFactor">Enable Two-Factor Authentication</Label>
            </div>
            <Button
              onClick={handleUpdatePassword}
              disabled={loading}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Updating..." : "Update Password"}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Bell className="h-5 w-5 text-green-600" />
              <CardTitle className="text-xl font-bold text-gray-800">Notification Settings</CardTitle>
            </div>
            <CardDescription className="text-gray-600">
              Choose how you want to be notified about important updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-blue-600" />
                  <div>
                    <Label htmlFor="emailNotifications">Email Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via email</p>
                  </div>
                </div>
                <Switch
                  id="emailNotifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-4 w-4 text-green-600" />
                  <div>
                    <Label htmlFor="smsNotifications">SMS Notifications</Label>
                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                </div>
                <Switch
                  id="smsNotifications"
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-4 w-4 text-purple-600" />
                  <div>
                    <Label htmlFor="pushNotifications">Push Notifications</Label>
                    <p className="text-sm text-gray-500">Receive push notifications in browser</p>
                  </div>
                </div>
                <Switch
                  id="pushNotifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-orange-600" />
                  <div>
                    <Label htmlFor="marketingEmails">Marketing Emails</Label>
                    <p className="text-sm text-gray-500">Receive promotional and marketing emails</p>
                  </div>
                </div>
                <Switch
                  id="marketingEmails"
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, marketing: checked })}
                />
              </div>
            </div>
            <Button
              onClick={handleSaveNotifications}
              disabled={loading}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Saving..." : "Save Preferences"}
            </Button>
          </CardContent>
        </Card>

        {/* Business Settings */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-t-lg">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-xl font-bold text-gray-800">Business Settings</CardTitle>
            </div>
            <CardDescription className="text-gray-600">
              Configure your business information and preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" placeholder="Your Studio Name" defaultValue="SignTrack Business" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number</Label>
                <Input id="gstNumber" placeholder="GST Number" defaultValue="27AAAAA0000A1Z5" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address</Label>
              <Input
                id="businessAddress"
                placeholder="Complete business address"
                defaultValue="123 Signage Street, Mumbai, Maharashtra 400001"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Input id="currency" placeholder="Currency" defaultValue="INR" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Input id="timezone" placeholder="Timezone" defaultValue="Asia/Kolkata" />
              </div>
            </div>
            <Button
              onClick={handleSaveBusinessSettings}
              disabled={loading}
              className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              {loading ? "Saving..." : "Save Business Settings"}
            </Button>
          </CardContent>
        </Card>

        {/* Account Management */}
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 border-red-200">
          <CardHeader className="bg-gradient-to-r from-red-50 to-rose-50 rounded-t-lg border-b border-red-100">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-red-600" />
              <CardTitle className="text-xl font-bold text-gray-800">Account Management</CardTitle>
            </div>
            <CardDescription className="text-gray-600">
              Manage your account settings and data preferences.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Export Your Data</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Download a copy of all your business data including customers, orders, and quotations.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="border-yellow-300 text-yellow-700 hover:bg-yellow-100 hover:border-yellow-400 bg-transparent"
                    onClick={handleExportData}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Export My Data
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-red-800">Delete Account</h3>
                    <p className="text-sm text-red-700 mt-1">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    <ul className="text-xs text-red-600 mt-2 list-disc list-inside space-y-1">
                      <li>All customer data will be permanently deleted</li>
                      <li>All orders and quotations will be removed</li>
                      <li>Payment history will be erased</li>
                      <li>Account cannot be recovered after deletion</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="destructive"
                    className="bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => setShowDeleteDialog(true)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete My Account
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Delete Account Confirmation Dialog */}
        <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <AlertDialogContent className="max-w-md">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-red-600 flex items-center space-x-2">
                <Trash2 className="h-5 w-5" />
                <span>Delete Account</span>
              </AlertDialogTitle>
              <AlertDialogDescription className="space-y-3">
                <p>This action will permanently delete your account and all associated data.</p>
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-800 font-medium">What will be deleted:</p>
                  <ul className="text-xs text-red-700 mt-1 list-disc list-inside space-y-1">
                    <li>Your profile and account information</li>
                    <li>All customer records and contact details</li>
                    <li>All orders, quotations, and job cards</li>
                    <li>Payment history and financial records</li>
                    <li>Reports and analytics data</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deleteConfirmation" className="text-sm font-medium">
                    Type <span className="font-bold text-red-600">DELETE</span> to confirm:
                  </Label>
                  <Input
                    id="deleteConfirmation"
                    value={deleteConfirmation}
                    onChange={(e) => setDeleteConfirmation(e.target.value)}
                    placeholder="Type DELETE here"
                    className="border-red-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setDeleteConfirmation("")
                  setShowDeleteDialog(false)
                }}
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={deleteConfirmation !== "DELETE"}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Delete Account Permanently
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  )
}
