import LastEvent from ".";

const data = {
  events: [
    {
      id: 1,
      type: "conférence",
      date: "2022-04-29T20:28:45.744Z",
      title: "User&product MixUsers",
      cover: "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
      description: "Présentation des nouveaux usages UX.",
      nb_guesses: 900,
      periode: "14-15-16 Avril",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "1 espace de restaurations",
      ],
    },
    {
      id: 2,
      type: "expérience digitale",
      date: "2022-01-29T20:28:45.744Z",
      title: "#DigitonPARIS",
      cover: "/images/charlesdeluvio-wn7dOzUh3Rs-unsplash.png",
      description:
        "Présentation des outils analytics aux professionnels du secteur ",
      nb_guesses: 1300,
      periode: "24-25-26 Février",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "1 site web dédié",
      ],
    },
    {
      id: 3,
      type: "conférence",
      date: "2022-03-29T20:28:45.744Z",
      title: "Conférence &co-responsable",
      cover: "/images/chuttersnap-Q_KdjKxntH8-unsplash.png",
      description:
        "Débats et échanges autour des collaborations eco-responsable.",
      nb_guesses: 600,
      periode: "24-25-26 Février",
      prestations: [
        "1 scéne principale",
        "1 espaces de restaurations",
        "1 site web dédié",
      ],
    },
  ],
};

describe("When LastEvent is call", () => {
  it("Should return the last event", () => {
    const today = new Date();
    let last = null;
    last = LastEvent(data.events, today);
    expect(last).toEqual({
      id: 1,
      type: "conférence",
      date: "2022-04-29T20:28:45.744Z",
      title: "User&product MixUsers",
      cover: "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png",
      description: "Présentation des nouveaux usages UX.",
      nb_guesses: 900,
      periode: "14-15-16 Avril",
      prestations: [
        "1 espace d’exposition",
        "1 scéne principale",
        "1 espace de restaurations",
      ],
    });
  });
});
