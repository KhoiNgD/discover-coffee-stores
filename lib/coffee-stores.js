import { createApi } from "unsplash-js";

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
});

export async function getCoffeeStorePhotos() {
  const photosResponse = await unsplashApi.search.getPhotos({
    query: "coffee shop",
    perPage: 40,
  });
  const photos = photosResponse.response.results.map(
    (result) => result.urls["small"]
  );
  return photos;
}

export async function fetchCoffeeStores(
  latLong = "43.65267326999575,-79.39545615725015",
  limit = 30
) {
  const photos = await getCoffeeStorePhotos();

  const storesResponse = await fetch(
    `https://api.foursquare.com/v3/places/nearby?ll=${latLong}&limit=${limit}&query=coffee stores&v=20220105`,
    {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
      },
    }
  );
  const { results } = await storesResponse.json();

  return results.map((venue, index) => ({
    id: venue.fsq_id,
    address: venue.location.address || "",
    name: venue.name,
    neighbourhood:
      (venue?.neighborhood?.length > 0 && venue?.neighborhood[0]) ||
      venue.location.cross_street ||
      "",
    imgUrl: photos[index],
  }));
}
