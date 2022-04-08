import Head from "next/head";
import Image from "next/image";
import Banner from "../components/banner";
import Card from "../components/card";
import styles from "../styles/Home.module.css";
import coffeeStoresData from "../data/coffee-stores.json";
import { fetchCoffeeStores } from "../lib/coffee-stores";
import { useEffect, useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "../store/store-context";
import useTrackLocation from "../hooks/use-track-location";

export async function getStaticProps(context) {
  try {
    const coffeeStores = await fetchCoffeeStores();

    return {
      props: {
        coffeeStores,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        coffeeStores: coffeeStoresData,
      },
    };
  }
}

export default function Home(props) {
  const { locationErrorMsg, isFindingLocation, handleTrackLocation } =
    useTrackLocation();
  const [coffeeStoresErr, setCoffeeStoresErr] = useState("");
  const {
    dispatch,
    state: { coffeeStores, latLong },
  } = useContext(StoreContext);

  useEffect(() => {
    (async function fetchStores() {
      if (latLong) {
        try {
          const fetchedCoffeeStores = await fetchCoffeeStores(latLong);
          dispatch({
            type: ACTION_TYPES.SET_COFFEE_STORES,
            payload: {
              coffeeStores: fetchedCoffeeStores,
            },
          });
        } catch (error) {
          setCoffeeStoresErr(error.message);
        }
      }
    })();
  }, [latLong, dispatch]);

  const handleOnBannerBtnClick = () => {
    handleTrackLocation();
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleClick={handleOnBannerBtnClick}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg}</p>}
        {coffeeStoresErr && <p>Something went wrong: {coffeeStoresErr}</p>}
        <div className={styles.heroImage}>
          <Image
            src="/static/hero-image.png"
            width={700}
            height={400}
            alt="hero image"
          />
        </div>

        {coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Stores near me</h2>
            <div className={styles.cardLayout}>
              {coffeeStores.map((store) => (
                <Card
                  key={store.id}
                  name={store.name}
                  imgUrl={store.imgUrl}
                  href={`/coffee-store/${store.id}`}
                />
              ))}
            </div>
          </>
        )}

        {props.coffeeStores.length > 0 && (
          <>
            <h2 className={styles.heading2}>Toronto stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((store) => (
                <Card
                  key={store.id}
                  name={store.name}
                  imgUrl={store.imgUrl}
                  href={`/coffee-store/${store.id}`}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
