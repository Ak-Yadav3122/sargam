import HomeHero from "../components/HomeHero";
import SmallSection from "../components/SmallSection";
import TopCharts from "../components/TopCharts";
import Categories from "../components/Categories";
import Search from "../components/Search";
import { Grid, GridItem, Hide } from "@chakra-ui/react";
import Artistes from "../components/Artistes";

const HomePage = () => {
  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(8, 1fr)" }}
      minH="100vh"
      pl={{ base: 2, md: 14, lg: 12, xl: 0 }}
      pb={24}
      pt={{ base: 20, md: 4 }}
      gap={4}
    >
      <GridItem
        colSpan={{ base: 1, lg: 5 }}
        p={{ base: 2, md: 4 }}
        order={{ base: 2, lg: 1 }}
      >
        <Search />
        <HomeHero />
        <SmallSection title="New Releases" endpoint="/songs/releases" />
        <Artistes />
        <SmallSection title="Popular Around You" endpoint="/songs/top" />
      </GridItem>
      <GridItem
        colSpan={{ base: 1, lg: 3 }}
        p={{ base: 2, md: 4 }}
        order={{ base: 1, lg: 2 }}
      >
        <Hide below="lg">
          <TopCharts />
          <Categories />
        </Hide>
      </GridItem>
    </Grid>
  );
};

export default HomePage;
