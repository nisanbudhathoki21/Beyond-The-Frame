
import Link from "next/link";
import { business } from "@/lib/config";
import { getPhotos } from "@/lib/photos";
import { allServices } from "@/lib/services";
import { npr } from "@/lib/format";
import { asset } from "@/lib/site";
import type { Photo } from "@/lib/photo-types";

export default function Home() {
  const photos = getPhotos();

  const heroPhoto =
    photos.find((photo) => photo.category === "mountains") ??
    photos.find((photo) => photo.category === "nature") ??
    photos[0];

  const featured = photos.slice(0, 6);

  const portrait = allServices.find((service) => service.id === "individual");
  const wedding = allServices.find((service) => service.id === "wedding");

  const categories = [
    {
      id: "portraits",
      number: "01",
      title: "Portraits",
      description: "Personal stories, expressions and connections.",
      href: "/services/",
    },
    {
      id: "weddings",
      number: "02",
      title: "Weddings & celebrations",
      description: "Meaningful occasions and the moments around them.",
      href: "/services/",
    },
    {
      id: "events",
      number: "03",
      title: "Events",
      description: "People, atmosphere and unforgettable gatherings.",
      href: "/services/",
    },
    {
      id: "commercial",
      number: "04",
      title: "Creative & commercial",
      description: "Products, businesses and visual storytelling.",
      href: "/services/",
    },
  ];

  const imageStyle = (photo: Photo) => ({
    objectPosition: photo.focus ?? "center",
  });

  return (
    <div className="home">
      <section className="home-hero">
        <div className="home-hero-copy">
          <p className="home-kicker">
            <span />
            PHOTOGRAPHY · NEPAL · VISUAL STORIES
          </p>

          <h1 className="home-title">
            Some moments
            <br />
            deserve to
            <br />
            <em>live forever.</em>
          </h1>

          <p className="home-lede">
            Beyond the Frame is about seeing the extraordinary in ordinary
            moments. Photography shaped by people, places, light and emotion.
          </p>

          <div className="home-actions">
            <Link href="/portfolio/" className="btn btn-primary">
              Explore the portfolio <span aria-hidden="true">↗</span>
            </Link>

            <Link href="/contact/" className="home-text-link">
              Plan a photoshoot <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="home-hero-index">
            <span>INDEPENDENT PHOTOGRAPHY</span>
            <span>EST. 2026</span>
          </div>
        </div>

        <div className="home-hero-visual">
          {heroPhoto ? (
            <figure className="home-hero-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={asset(heroPhoto.file)}
                alt={heroPhoto.alt}
                style={imageStyle(heroPhoto)}
                fetchPriority="high"
              />

              <figcaption>
                <span>{heroPhoto.caption || "A moment worth remembering"}</span>
                <span>{heroPhoto.place || "Nepal"}</span>
              </figcaption>
            </figure>
          ) : (
            <div className="home-hero-empty">
              <span>BEYOND THE FRAME</span>
              <p>Photography begins with seeing.</p>
            </div>
          )}

          <div className="home-hero-mark" aria-hidden="true">
            BTF
          </div>

          <p className="home-vertical-note">
            PHOTOGRAPHY / STORIES / PERSPECTIVES
          </p>
        </div>
      </section>

      <section className="home-intro">
        <div className="home-intro-label">
          <span>01 / THE APPROACH</span>
          <span>LOOK CLOSER</span>
        </div>

        <div className="home-intro-content">
          <h2>
            Not just what
            <br />
            you see. <em>What you feel.</em>
          </h2>

          <p>
            A photograph can hold a place, a feeling and a memory in a single
            frame. Our approach is simple: notice the details, respect the
            moment and create photographs that feel genuine.
          </p>

          <Link href="/about/" className="home-text-link">
            Discover our story <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="home-work">
        <div className="home-section-heading">
          <div>
            <p className="home-kicker">
              <span />
              02 / SELECTED PHOTOGRAPHS
            </p>
            <h2>
              A collection of
              <br />
              <em>moments.</em>
            </h2>
          </div>

          <Link href="/portfolio/" className="home-text-link">
            View all photographs <span aria-hidden="true">↗</span>
          </Link>
        </div>

        {featured.length > 0 ? (
          <div className="home-work-grid">
            {featured.map((photo, index) => (
              <Link
                href={`/portfolio/#${photo.category}`}
                className={`home-work-card home-work-card-${index + 1}`}
                key={photo.id}
                aria-label={`Explore ${photo.caption || photo.alt}`}
              >
                <div className="home-work-image">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={asset(photo.thumb)}
                    alt={photo.alt}
                    width={photo.w}
                    height={photo.h}
                    loading="lazy"
                    decoding="async"
                    style={imageStyle(photo)}
                  />
                  <span className="home-work-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>

                <div className="home-work-caption">
                  <span>{photo.caption || photo.category}</span>
                  <span>{photo.place || "Nepal"}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="empty">
            The photography collection is being prepared. New frames are on
            their way.
          </p>
        )}
      </section>

      <section className="home-services">
        <div className="home-section-heading">
          <div>
            <p className="home-kicker">
              <span />
              03 / WHAT WE PHOTOGRAPH
            </p>
            <h2>
              Made for the
              <br />
              <em>moments that matter.</em>
            </h2>
          </div>

          <p className="home-section-description">
            From personal portraits to important celebrations, every
            assignment begins with understanding your story.
          </p>
        </div>

        <div className="home-service-list">
          {categories.map((category) => (
            <Link
              href={category.href}
              className="home-service-item"
              key={category.id}
            >
              <span className="home-service-number">{category.number}</span>

              <div>
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>

              <span className="home-service-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>

        <Link href="/services/" className="home-outline-link">
          Explore all services and rates <span aria-hidden="true">↗</span>
        </Link>
      </section>

      <section className="home-philosophy">
        <div className="home-philosophy-inner">
          <p className="home-kicker">
            <span />
            04 / THE PHILOSOPHY
          </p>

          <h2>
            Real people.
            <br />
            Real places.
            <br />
            <em>Real moments.</em>
          </h2>

          <p>
            The best photographs don't need to feel forced. They come from
            patience, observation and being present when something meaningful
            happens.
          </p>

          <Link href="/about/" className="home-text-link">
            More about our approach <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section className="home-rates">
        <div>
          <p className="home-kicker">
            <span />
            05 / INVEST IN MEMORIES
          </p>

          <h2>
            Beautiful photographs.
            <br />
            <em>Clear pricing.</em>
          </h2>

          <p className="home-section-description">
            Every photoshoot is different. Explore the starting rates and
            discuss your requirements before confirming a booking.
          </p>

          <Link href="/services/" className="btn btn-primary">
            Explore pricing <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <div className="home-rate-preview">
          {portrait && (
            <div>
              <span>PORTRAITS</span>
              <strong>From {npr(portrait.priceNPR)}</strong>
            </div>
          )}

          {wedding && (
            <div>
              <span>WEDDINGS</span>
              <strong>From {npr(wedding.priceNPR)}</strong>
            </div>
          )}

          <p>Starting prices. Final quotation confirmed before booking.</p>
        </div>
      </section>

      <section className="home-equipment">
        <div>
          <p className="home-kicker">
            <span />
            06 / THE EQUIPMENT
          </p>

          <h2>
            The camera is a tool.
            <br />
            <em>The vision is everything.</em>
          </h2>

          <p className="home-section-description">
            Working with a compact DSLR setup and natural light, with an
            emphasis on observation, composition and authentic moments.
          </p>

          <Link href="/about/" className="home-text-link">
            Explore the equipment <span aria-hidden="true">↗</span>
          </Link>
        </div>

        <dl className="home-equipment-list">
          <div>
            <dt>CAMERA BODY</dt>
            <dd>{business.camera.body}</dd>
          </div>
          <div>
            <dt>LENS</dt>
            <dd>{business.camera.lens}</dd>
          </div>
          <div>
            <dt>FILTER</dt>
            <dd>{business.camera.filter}</dd>
          </div>
          <div>
            <dt>SENSOR</dt>
            <dd>{business.camera.sensor}</dd>
          </div>
        </dl>
      </section>

      <section className="home-cta">
        <p className="home-kicker">
          <span />
          LET'S CREATE SOMETHING MEANINGFUL
        </p>

        <h2>
          Your story deserves
          <br />
          <em>more than a snapshot.</em>
        </h2>

        <p>
          Have an event, a portrait session or an idea in mind? Let's talk
          about it.
        </p>

        <Link href="/contact/" className="btn btn-primary">
          Start a conversation <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </div>
  );
}
