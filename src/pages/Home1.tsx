import Hero from "../components/Hero"
import Navbar from "../components/navbar"
import FeatureCards from "../components/featureCards"
import Mentoship from "../components/mentoship"
import Socials from "../components/socials"
import LatestNewsletter from "../components/newsletters"

let features = [
    { title: 'Inspiration', desc: 'We aim to serve as the source of inspiration and encouragement to the young men with no exemplary, positive role models within their communities.' },
    { title: 'Integrity', desc: "We believe in the direct demonstration and embodiment of socially astute virtues. We do not only Talk the Talk, but more-so we walk the walk too! " },
    { title: 'Insight', desc: 'We believe knowledge is indeed power, but precise understanding empowers us all to act proactively and responsibly.' },
  ];
export default function Home1() {
    return (
        <>
            
            <Navbar/>
            <div className="mt-15 m-5 sm:mx-10 md:mx-25 mb-10">
            <Hero />
            <FeatureCards features={features}/>
            <h1 className="text-center text-lg sm:text-4xl font-bold my-3">Newsletter</h1>
            <LatestNewsletter/>
            <Mentoship />
            </div>
            <Socials/>
        </>
    )
}