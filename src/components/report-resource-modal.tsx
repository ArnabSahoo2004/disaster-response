import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { resourceTypes } from "@/lib/data"
import { useLanguage } from "@/lib/language-context"
import type { TranslationKey } from "@/lib/language-context"

interface ReportResourceModalProps {
  onSubmit: (data: {
    type: TranslationKey;
    title: string;
    description: string;
    location: string;
  }) => void;
}

export function ReportResourceModal({ onSubmit }: ReportResourceModalProps) {
  const [open, setOpen] = React.useState(false)
  const [type, setType] = React.useState<TranslationKey>(resourceTypes[0].name)
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [location, setLocation] = React.useState("")
  const { t } = useLanguage()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ type, title, description, location })
    setOpen(false)
    // Reset form
    setType(resourceTypes[0].name)
    setTitle("")
    setDescription("")
    setLocation("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">{t('report_resource')}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{t('report_resource')}</DialogTitle>
            <DialogDescription>
              {t('report_resource_description')}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="type">{t('resource_type')}</Label>
              <Select value={type} onValueChange={(value: TranslationKey) => setType(value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t('select_type')} />
                </SelectTrigger>
                <SelectContent>
                  {resourceTypes.map((resourceType) => (
                    <SelectItem key={resourceType.name} value={resourceType.name}>
                      {t(resourceType.name)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">{t('title')}</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('resource_title_placeholder')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">{t('description')}</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={t('resource_description_placeholder')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">{t('location')}</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t('resource_location_placeholder')}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={!type || !title || !description || !location}>
              {t('submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 