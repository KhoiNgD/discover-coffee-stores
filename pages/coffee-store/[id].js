import Link from "next/link";
import { useRouter } from "next/router";
import coffeeStoresData from "../../data/coffee-stores.json";

export function getStaticProps(staticProps) {
  const { params } = staticProps;
  return {
    props: {
      coffeeStore: coffeeStoresData.find(
        (store) => store.id.toString() === params.id
      ),
    },
  };
}

export function getStaticPaths() {
  return {
    paths: [{ params: { id: "0" } }, { params: { id: "1" } }],
    fallback: false,
  };
}

const CoffeeStore = () => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      coffee-store id: {router.query.id}
      <Link href="/">Back to home</Link>
    </div>
  );
};

export default CoffeeStore;
