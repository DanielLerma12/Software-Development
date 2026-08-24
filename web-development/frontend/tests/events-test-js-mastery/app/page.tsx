import ExploreBtn from "@/components/ExploreBtn";

const Page = () => {
  return (
    <section>
      <h1 className="h1-bold text-center">
        <span className="inner-shadow-text">
          The Hub for Every Dev
        </span>{" "}
        <br />
        <span className="gradient-text glow-text">
          Event You Can&apos;t Miss
        </span>
      </h1>
      <p className="p-medium-14 text-center mt-5">
        Hackathons, Meetups and Conferences, All in One Place
      </p>
      <ExploreBtn />
    </section>
  );
};

export default Page;
