import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Droplet, Users, Share2, AlertCircle, CheckCircle } from 'lucide-react';

interface SupplyWaterCardProps {
  title: string;
  timeAgo: string;
  verifiedCount: number;
  details: string;
  location: {
    name: string;
    address: string;
  };
  status: {
    supplyLevel: string;
    queueTime: string;
    hours: string;
  };
  additionalInfo: string[];
}

export function SupplyWaterCard({
  title,
  timeAgo,
  verifiedCount,
  details,
  location,
  status,
  additionalInfo,
}: SupplyWaterCardProps) {
  const handleGetDirections = () => {
    // Open in Google Maps
    const encodedAddress = encodeURIComponent(location.address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleVerify = () => {
    // TODO: Implement verification logic
    console.log('Verifying report...');
  };

  const handleReportIssue = () => {
    // TODO: Implement report issue logic
    console.log('Reporting issue...');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `${details}\nLocation: ${location.name}\nAddress: ${location.address}`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      console.log('Web Share API not supported');
    }
  };

  const handleViewDetails = () => {
    // TODO: Implement view details logic
    console.log('Viewing full details...');
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Droplet className="h-6 w-6 text-green-500" />
          <div className="flex-1">
            <CardTitle>{title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Community Report</span>
              <span>•</span>
              <span>{timeAgo}</span>
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle className="h-4 w-4" />
                Verified by {verifiedCount} people
              </span>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div>
          <h3 className="font-semibold mb-2">Details</h3>
          <p className="text-gray-600">{details}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Location</h3>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="font-medium">{location.name}</p>
              <p className="text-sm text-gray-600">{location.address}</p>
            </div>
            <Button variant="outline" onClick={handleGetDirections}>
              <MapPin className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Status Information</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Droplet className="h-4 w-4 text-blue-600" />
                Supply Level
              </div>
              <p className="mt-1 font-semibold">{status.supplyLevel}</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Users className="h-4 w-4 text-green-600" />
                Queue Time
              </div>
              <p className="mt-1 font-semibold">{status.queueTime}</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Clock className="h-4 w-4 text-purple-600" />
                Hours
              </div>
              <p className="mt-1 font-semibold">{status.hours}</p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Additional Information</h3>
          <ul className="space-y-2">
            {additionalInfo.map((info, index) => (
              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                {info}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex flex-wrap gap-3 justify-between">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleVerify}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Verify
          </Button>
          <Button variant="outline" onClick={handleReportIssue}>
            <AlertCircle className="h-4 w-4 mr-2" />
            Report Issue
          </Button>
          <Button variant="outline" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
        <Button onClick={handleViewDetails}>View Full Details</Button>
      </CardFooter>
    </Card>
  );
} 