import fs from "fs";
import path from "path";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../../styles/Home.module.css";
import { cookies } from "next/headers";

interface Gift {
  image: string;
  title: string;
  price: string;
  description: string;
}

interface TenantData {
  title: string;
  bannerImage: string;
  featuredGifts: Gift[];
}

async function getTenantData(tenant: string): Promise<TenantData | null> {
  const filePath = path.join(
    process.cwd(),
    "public",
    "tenants",
    `${tenant ?? "in"}.json`
  );

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (err) {
    console.error(`Error loading data for tenant ${tenant}`, err);
    return null;
  }
}

const Home = async () => {
  //cookies().get("tenant")?.value ??
  const tenant = "in";
  const tenantData = await getTenantData(tenant);

  if (!tenantData) {
    return <div>Error loading tenant data.</div>;
  }

  return (
    <div className="container-fluid">
      <h1 className="fw-bold m-sm-5 py-sm-3 py-3 text-center title">
        {tenantData.title}
      </h1>
      <header className={styles.header}>
        <Image
          src={tenantData.bannerImage}
          alt="Banner Image"
          className={styles.largeImage}
          width={1920}
          height={1080}
        />
      </header>

      <main className={styles.main}>
        <div className="featured">
          <h3 className="fw-bold m-sm-5 py-sm-5 pt-5 text-center">
            Featured Gifts
          </h3>
        </div>
        <div className={styles.grid}>
          {tenantData.featuredGifts.map((gift, index) => (
            <div key={index} className={styles.card}>
              <Image
                src={gift.image}
                alt={`Image ${index + 1}`}
                className={styles.image}
                width={500}
                height={300}
              />
              <div className={styles.content}>
                <h3>{gift.title}</h3>
                <p>{gift.price}</p>
                <p>{gift.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
