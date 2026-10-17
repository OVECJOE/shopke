import { mission, values, team } from "../../data/about";
import "./about.css";

export default function AboutPage() {
  return (
    <>
      <section className="section about__intro">
        <h1 className="h-page about__title">
          We help Nigerian businesses sell online with confidence.
        </h1>
        <p className="about__mission text-muted">{mission}</p>
      </section>

      <section className="section section--flush-top">
        <h2 className="visually-hidden">Our values</h2>
        <div className="grid grid--3">
          {values.map((value) => (
            <article className="card" key={value.title}>
              <h3 className="about__card-title">{value.title}</h3>
              <p>{value.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section section--flush-top">
        <h2 className="h-section about__heading">The team</h2>
        <div className="grid grid--3">
          {team.map((member) => (
            <article className="card" key={member.name}>
              <div className="placeholder about__photo" aria-hidden="true" />
              <h3 className="about__name">{member.name}</h3>
              <p className="text-muted">{member.role}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}