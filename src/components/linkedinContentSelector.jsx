import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ClipboardIcon } from "lucide-react";

export default function LinkedInContentSelector({
  linkedinInvite,
  linkedinReferral,
  handleCopy,
}) {
  const [selectedOption, setSelectedOption] = useState("referral"); // Tracks dropdown selection

  return (
    <div className="mt-6 space-y-4">
      {/* Dropdown Selection */}
      <Select
        onValueChange={(value) => setSelectedOption(value)}
        value={selectedOption}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Content" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="referral">LinkedIn Referral</SelectItem>
          <SelectItem value="invite">LinkedIn Personalized Invite</SelectItem>
        </SelectContent>
      </Select>

      {/* Conditional Rendering Based on Selection */}
      {selectedOption === "invite" && (
        <div className="p-4 bg-gray-100 border rounded-lg">
          <h3 className="font-semibold text-lg">
            LinkedIn Personalized Invite:
          </h3>
          <textarea
            value={linkedinInvite}
            className="mt-2 w-full resize-none p-2 border rounded-lg"
            style={{ minHeight: "100px" }}
            readOnly
          />
          <div className="flex justify-end px-2">
            <span className="text-sm text-gray-500">
              {linkedinInvite.length} characters
            </span>
          </div>
          <Button
            onClick={() => handleCopy(linkedinInvite)}
            className="mt-2 w-full"
            variant="outline"
          >
            <ClipboardIcon className="mr-2" />
            Copy Invite
          </Button>
        </div>
      )}

      {selectedOption === "referral" && (
        <div className="p-4 bg-gray-100 border rounded-lg">
          <h3 className="font-semibold text-lg">LinkedIn Referral:</h3>
          <textarea
            value={linkedinReferral}
            className="mt-2 w-full resize-none p-2 border rounded-lg"
            style={{ minHeight: "100px" }}
            readOnly
          />
          <div className="flex justify-end px-2">
            <span className="text-sm text-gray-500">
              {linkedinReferral.length} characters
            </span>
          </div>
          <Button
            onClick={() => handleCopy(linkedinReferral)}
            className="mt-2 w-full"
            variant="outline"
          >
            <ClipboardIcon className="mr-2" />
            Copy Referral
          </Button>
        </div>
      )}
    </div>
  );
}
