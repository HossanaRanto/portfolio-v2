"use client"

import { useRouter } from "next/navigation";
import { Experience } from "@/domain/entities/Experience";
import { Dialog, DialogContent, DialogTitle } from "@/presentation/components/ui/dialog";
import { ExperienceDetails } from "./ExperienceDetails";

/** Experience popup driven by the URL: open while `?experience=<id>` is present. */
export function ExperienceDialog({ experience, closeHref }: { experience: Experience | null; closeHref: string }) {
    const router = useRouter();

    return (
        <Dialog open={!!experience} onOpenChange={(open) => !open && router.push(closeHref, { scroll: false })}>
            {experience && (
                <DialogContent inline className="max-w-3xl max-h-[90vh] overflow-y-auto w-[95vw]">
                    <DialogTitle className="sr-only">{experience.role} — {experience.company}</DialogTitle>
                    <ExperienceDetails experience={experience} />
                </DialogContent>
            )}
        </Dialog>
    );
}
