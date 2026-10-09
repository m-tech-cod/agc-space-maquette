import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Textarea } from '@/components/ui/textarea'
import type { Publication } from '@/types'

const schema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères.'),
  content: z.string().min(10, 'Rédige au moins quelques mots de contenu.'),
  mediaType: z.enum(['image', 'video', 'carousel', 'text']),
  scheduledAt: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

const MEDIA_LABELS: Record<FormValues['mediaType'], string> = {
  image: 'Image',
  video: 'Vidéo',
  carousel: 'Carrousel',
  text: 'Texte seul',
}

interface ComposerSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreate: (publication: Publication) => void
}

export function ComposerSheet({ open, onOpenChange, onCreate }: ComposerSheetProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', content: '', mediaType: 'image', scheduledAt: '' },
  })

  const mediaType = watch('mediaType')

  function submit(values: FormValues, mode: 'draft' | 'to_validate') {
    const publication: Publication = {
      id: `p-local-${Date.now()}`,
      title: values.title,
      content: values.content,
      status: mode === 'draft' ? 'draft' : values.scheduledAt ? 'scheduled' : 'to_validate',
      mediaType: values.mediaType,
      mediaLabel: MEDIA_LABELS[values.mediaType],
      scheduledAt: values.scheduledAt || null,
      publishedAt: null,
      authorId: 'u-com',
    }
    onCreate(publication)
    reset()
    onOpenChange(false)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle>Nouvelle publication</SheetTitle>
          <SheetDescription>
            Préparez le contenu, choisissez un média et programmez (ou non) la diffusion.
          </SheetDescription>
        </SheetHeader>

        <form className="flex flex-1 flex-col gap-4 overflow-y-auto p-5">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="title">Titre interne</Label>
            <Input id="title" placeholder="Ex. Lancement nouvelle offre" {...register('title')} />
            {errors.title && <p className="text-xs text-danger">{errors.title.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="content">Contenu de la publication</Label>
            <Textarea
              id="content"
              rows={5}
              placeholder="Rédige le texte qui sera publié sur Facebook…"
              {...register('content')}
            />
            {errors.content && <p className="text-xs text-danger">{errors.content.message}</p>}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Type de média</Label>
            <Select value={mediaType} onValueChange={(v) => setValue('mediaType', v as FormValues['mediaType'])}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(MEDIA_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="scheduledAt">Date et heure de programmation (optionnel)</Label>
            <Input id="scheduledAt" type="datetime-local" {...register('scheduledAt')} />
            <p className="text-xs text-muted-foreground">
              Laisse vide pour enregistrer sans créneau défini.
            </p>
          </div>
        </form>

        <SheetFooter>
          <Button variant="outline" onClick={handleSubmit((v) => submit(v, 'draft'))}>
            Enregistrer en brouillon
          </Button>
          <Button onClick={handleSubmit((v) => submit(v, 'to_validate'))}>
            Soumettre à validation
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
