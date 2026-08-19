import "./TwitterFollowCard.css";
import { TwitterFollowCard } from "./TwitterFollowCard";

export function App() {
  const formatUserName = (userName) => `@${userName}`;

  return (
    <>
      <section className="App">
        <TwitterFollowCard
          userName="HouseOfDragon"
          initialIsFollowing={false}
          initialIsFollowingHover={false}
          formatUserName={formatUserName}
          link="https://unavatar.io/steam/id:gabelogannewell"
        >
          House of the Dragon
        </TwitterFollowCard>

        <TwitterFollowCard
          userName="GameOfThrones"
          initialIsFollowing={true}
          initialIsFollowingHover={false}
          formatUserName={formatUserName}
          link="https://unavatar.io/steam/profile:76561198044605749"
        >
          Game of Thrones
        </TwitterFollowCard>
      </section>
    </>
  );
}
