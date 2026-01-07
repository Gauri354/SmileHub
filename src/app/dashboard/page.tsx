import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Calendar, FileText, User } from "lucide-react"

export const metadata = {
  title: 'Patient Dashboard | SmileHub Dental',
  description: 'Manage your appointments, view your analysis history, and access your records.',
};

export default function DashboardPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mb-12">
          <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight">Patient Dashboard</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Welcome back! Here's a summary of your dental health journey.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-primary" />
                    <CardTitle>Upcoming Appointments</CardTitle>
                </div>
                <CardDescription>Your scheduled visits. You will receive a reminder 24 hours prior.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder for loading state */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Skeleton className="h-5 w-48 mb-2" />
                      <Skeleton className="h-4 w-64" />
                    </div>
                    <Skeleton className="h-10 w-24" />
                  </div>
                   <div className="text-center py-8 text-muted-foreground">
                    <p>No upcoming appointments.</p>
                    <p className="text-sm">Ready for a check-up?</p>
                </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                 <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-primary" />
                    <CardTitle>AI Analysis History</CardTitle>
                </div>
                <CardDescription>A log of your past AI-assisted dental analyses.</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Placeholder for loading state */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Skeleton className="h-5 w-40 mb-2" />
                      <Skeleton className="h-4 w-56" />
                    </div>
                    <Skeleton className="h-10 w-24" />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Skeleton className="h-5 w-40 mb-2" />
                      <Skeleton className="h-4 w-56" />
                    </div>
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-24">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                </div>
                <CardTitle><Skeleton className="h-6 w-3/4 mx-auto" /></CardTitle>
                <CardDescription><Skeleton className="h-4 w-1/2 mx-auto" /></CardDescription>
              </CardHeader>
              <CardContent>
                <Separator className="my-4" />
                 <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Member Since:</span>
                        <Skeleton className="h-4 w-24" />
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Visit:</span>
                        <Skeleton className="h-4 w-20" />
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Next Cleaning Due:</span>
                        <Skeleton className="h-4 w-28" />
                    </div>
                </div>
                <Separator className="my-4" />
                <Skeleton className="h-10 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
