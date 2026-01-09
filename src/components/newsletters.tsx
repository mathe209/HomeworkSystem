import axios from "axios";  // we use axios to fetch index.json
import { useEffect, useState } from "react"; // React hooks


const DAYS = {
  monday: "Monday",
  wednesday: "Wednesday",
};

export default function LatestNewsletter() {
  const [latest, setLatest] = useState<any>(null);
  const [showBoth, setShowBoth] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("/newsletters/dummyData.json")
      .then((res) => {
        const today = new Date();
        const dayOfWeek = today.getDay();
        const todayStr = today.toISOString().split("T")[0];

        // On weekends (0=Sunday, 6=Saturday), show both newsletters
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          setShowBoth(true);
          
          const getLatestForDay = (day: string) => {
            const newsletters = res.data[day] || [];
            return newsletters
              .filter((n: any) => n.releaseDate <= todayStr)
              .sort((a: any, b: any) => b.releaseDate.localeCompare(a.releaseDate))[0];
          };

          const mondayNewsletter = getLatestForDay('monday');
          const wednesdayNewsletter = getLatestForDay('wednesday');
          
          setLatest({
            monday: mondayNewsletter ? { ...mondayNewsletter, day: 'Monday' } : null,
            wednesday: wednesdayNewsletter ? { ...wednesdayNewsletter, day: 'Wednesday' } : null
          });
          return;
        }

        // Weekday logic remains the same
        let targetDay = null;
        if (dayOfWeek === 1 || dayOfWeek === 2) {
          targetDay = "monday";
        } else if (dayOfWeek === 3 || dayOfWeek === 4 || dayOfWeek === 5) {
          targetDay = "wednesday";
        }

        if (!targetDay) {
          setLatest(null);
          return;
        }

        const newsletters = res.data[targetDay] || [];
        const latestForDay = newsletters
          .filter((n: any) => n.releaseDate <= todayStr)
          .sort((a: any, b: any) => b.releaseDate.localeCompare(a.releaseDate))[0];

        if (latestForDay) {
          setLatest({
            ...latestForDay,
            day: DAYS[targetDay as keyof typeof DAYS] || targetDay,
          });
        } else {
          setLatest(null);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch newsletters", err);
        setError("Failed to load newsletters. Please try again later.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4">Loading latest newsletter...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!latest) return <div className="p-4">No newsletter available today.</div>;

  if (showBoth) {
    return (
      <div className="space-y-8">
        {latest.monday && (
          <NewsletterCard newsletter={latest.monday} />
        )}
        {latest.wednesday && (
          <NewsletterCard newsletter={latest.wednesday} />
        )}
      </div>
    );
  }

  return <NewsletterCard newsletter={latest} />;
}

function NewsletterCard({ newsletter }: { newsletter: any }) {
  return (
    <>
    <h1 className="p-2 text-2xl font-bold text-center text-white rounded-t-lg border-b border-purple-600">Latest Newsletter</h1>
    <div className="overflow-hidden mx-auto my-4 w-full max-w-3xl bg-white rounded-lg border border-purple-600 shadow-sm">
      {/* Image Section - Always on top */}
      <div className="w-full h-48 sm:h-64 md:h-80">
        <img 
          src={newsletter.image}
          alt={newsletter.title}
          className="object-cover w-full h-full"
        />
      </div>
      
      {/* Text Section - Always below image */}
      <div className="p-4 sm:p-6">
        <div className="text-xs font-medium tracking-wider text-gray-500 uppercase">
          {newsletter.day} • {new Date(newsletter.releaseDate).toLocaleDateString()}
        </div>
        <h3 className="mt-1 text-xl font-bold text-gray-900">
          {newsletter.title}
        </h3>
        {newsletter.description && (
          <p className="mt-2 text-gray-600">
            {newsletter.description}
          </p>
        )}
        <div className="mt-4">
          <button 
            onClick={() => window.open(newsletter.image, '_blank')}
            className="text-sm font-medium text-blue-600 hover:text-blue-500"
          >
            View Full Size →
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
