// filepath: /Users/oassas/Projets/replypilot/src/app/page.tsx
import ReviewList from "./reviews/review-list";

export default function Home() {
  return (
    <div className="font-sans min-h-screen p-8 sm:p-20">
      <main className="flex flex-col items-center">
        <ReviewList />
      </main>
    </div>
  );
}
