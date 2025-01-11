import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ClipboardIcon } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/use-toast"
import { Toaster } from '@/components/ui/toaster';

const formSchema = z.object({
  name: z.string().min(1, 'Your name is required'),
  recipientName: z.string().min(1, 'Recipient name is required'),
  company: z.string().min(1, 'Company name is required'),
  position: z.string().min(1, 'Position is required'),
  jobId: z.string().optional(),
  jobUrl: z
    .string()
    .optional()
    .refine(
      (value) => !value || /^https?:\/\/[\w-]+(\.[\w-]+)+[/#?]?.*$/.test(value),
      'Job URL must be a valid URL'
    ),
});

function App() {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
  });

  const [linkedinInvite, setLinkedinInvite] = useState('');
  const [linkedinReferral, setLinkedinReferral] = useState('');
  const { toast } = useToast();

  const onSubmit = (data) => {
    const { name, recipientName, company, position, jobId, jobUrl } = data;

    // Updated invite string format
    const invite = `Hi ${recipientName}, I’m ${name}, with a keen interest in the work at ${company}. I’m eager to join as a ${position} and would love to connect and learn from your experiences.`;
    const referral = `Hi ${recipientName}, thank you for connecting! I’m very interested in the ${position} role at ${company} (Job ID: ${jobId}). I believe my skills align well with the position. Here’s the job URL: ${jobUrl}. I’d greatly appreciate it if you could refer me for this opportunity. Please let me know if I can share my resume or any other details to help with the process. Thanks again for your time and support!`

    setLinkedinInvite(invite);
    setLinkedinReferral(referral);
  };

  const showToast = () => {
    toast({
      description: "Copied to clipboard!",
      duration: 1000,
    });
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    showToast();
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <Toaster />
      <h1 className="text-3xl font-semibold text-center mb-6">RefLink </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          {/* Name and Recipient Name Fields */}
          <div className="flex space-x-4">
            <div className="flex flex-col w-1/2">
              <label>Your Name</label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Your Name"
                    className={errors.name ? 'border-red-500' : ''}
                  />
                )}
              />
              {errors.name && <span className="text-red-500">{errors.name.message}</span>}
            </div>

            <div className="flex flex-col w-1/2">
              <label>Recipient Name</label>
              <Controller
                name="recipientName"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Recipient Name"
                    className={errors.recipientName ? 'border-red-500' : ''}
                  />
                )}
              />
              {errors.recipientName && <span className="text-red-500">{errors.recipientName.message}</span>}
            </div>
          </div>

          {/* Company Field */}
          <div className="flex flex-col">
            <label>Company Name</label>
            <Controller
              name="company"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Company Name"
                  className={errors.company ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.company && <span className="text-red-500">{errors.company.message}</span>}
          </div>

          {/* Position Field */}
          <div className="flex flex-col">
            <label>Position Name</label>
            <Controller
              name="position"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Position Name"
                  className={errors.position ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.position && <span className="text-red-500">{errors.position.message}</span>}
          </div>

          {/* Job ID Field */}
          <div className="flex flex-col">
            <label>Job ID (Optional)</label>
            <Controller
              name="jobId"
              control={control}
              render={({ field }) => <Input {...field} placeholder="Job ID" />}
            />
          </div>

          {/* Job URL Field */}
          <div className="flex flex-col">
            <label>Job URL (Optional)</label>
            <Controller
              name="jobUrl"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Job URL"
                  className={errors.jobUrl ? 'border-red-500' : ''}
                />
              )}
            />
            {errors.jobUrl && <span className="text-red-500">{errors.jobUrl.message}</span>}
          </div>

          <Button type="submit" className="w-full">Generate Snippets</Button>
        </div>
      </form>

      {(linkedinInvite || linkedinReferral) && (
        <div className="mt-6 space-y-4">
          <div className="p-4 bg-gray-100 border rounded-lg">
            <h3 className="font-semibold text-lg">LinkedIn Personalized Invite:</h3>
            <div className="relative">
              <textarea
                value={linkedinInvite}
                className="mt-2 w-full resize-none p-2 border rounded-lg"
                style={{ minHeight: '100px', maxHeight: 'auto' }}
              />
              <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                {linkedinInvite.length} characters
              </span>
            </div>
            <Button onClick={() => handleCopy(linkedinInvite)} className="mt-2 w-full" variant="outline">
              <ClipboardIcon className="mr-2" />
              Copy Invite
            </Button>
          </div>

          <div className="p-4 bg-gray-100 border rounded-lg">
            <h3 className="font-semibold text-lg">LinkedIn Referral:</h3>
            <div className="relative">
              <textarea
                value={linkedinReferral}
                className="mt-2 w-full resize-none p-2 border rounded-lg"
                style={{ minHeight: '100px', maxHeight: 'auto' }}
              />
              <span className="absolute bottom-2 right-2 text-sm text-gray-500">
                {linkedinReferral.length} characters
              </span>
            </div>
            <Button onClick={() => handleCopy(linkedinReferral)} className="mt-2 w-full" variant="outline">
              <ClipboardIcon className="mr-2" />
              Copy Referral
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
