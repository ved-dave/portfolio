Update the work experience timeline on the portfolio site to reflect the latest resume.

Steps:
1. Read `website/public/Ved_resume.pdf` to extract the current work experience
2. Read `website/src/app/experience/page.tsx` to see the current state of the timeline
3. Update the `workExperience` array in `experience/page.tsx` to match the resume — company, role, team, start/end dates, and 1-2 bullet points per role
4. Preserve any existing logo paths that are already populated (non-null); add `logo: null` with a comment for any new entries
5. Do not change layout, styling, or anything outside the `workExperience` array unless asked
