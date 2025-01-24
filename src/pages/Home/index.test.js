import { fireEvent, render, screen } from "@testing-library/react"
import Home from "./index"
import { api, DataProvider } from "../../contexts/DataContext"
import EventList from "../../containers/Events"
import PeopleCard from "../../components/PeopleCard"
import EventCard from "../../components/EventCard"
import LastEvent from "../../components/LastEvent"

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
  focus: [
    {
      id: 1,
      title: "World economic forum",
      description:
        "Oeuvre à la coopération entre le secteur public et le privé.",
      date: "2022-01-29T20:28:45.744Z",
      cover: "/images/evangeline-shaw-nwLTVwb7DbU-unsplash1.png",
    },
    {
      id: 2,
      title: "Nordic design week",
      description: "Conférences sur le design de demain dans le digital",
      date: "2022-03-29T20:28:45.744Z",
      cover: "/images/teemu-paananen-bzdhc5b3Bxs-unsplash1.png",
    },
  ],
}

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data)
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    )
    await screen.findByText("Email")
    await screen.findByText("Nom")
    await screen.findByText("Prénom")
    await screen.findByText("Personel / Entreprise")
    await screen.findByText("Message")
  })

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      api.loadData = jest.fn().mockReturnValue(data)
      render(
        <DataProvider>
          <Home />
        </DataProvider>
      )
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      )
      await screen.findByText("En cours")
      await screen.findByText("Message envoyé !")
    })
  })
})

describe("When a page is created", () => {
  it("a list of events is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data)
    render(
      <DataProvider>
        <Home>
          <EventList />
        </Home>
      </DataProvider>
    )
    const eventListElement = await screen.findAllByTestId("card-testid")
    expect(eventListElement.length).toBeGreaterThan(0)
    eventListElement.forEach((element) => {
      expect(element).toBeInTheDocument()
    })
  })
  it("a list of people is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data)
    render(
      <DataProvider>
        <Home>
          <PeopleCard
            imageSrc="/images/stephanie-liverani-Zz5LQe-VSMY-unsplash.png"
            name="Samira"
            position="CEO"
          />
          <PeopleCard
            imageSrc="/images/linkedin-sales-solutions-pAtA8xe_iVM-unsplash.png"
            name="Jean-baptiste"
            position="Directeur marketing"
          />
        </Home>
      </DataProvider>
    )
    const peopleListElement = await screen.findAllByTestId("people-card-testid")
    expect(peopleListElement.length).toBeGreaterThan(0)
    peopleListElement.forEach((element) => {
      expect(element).toBeInTheDocument()
    })
  })
  it("a footer is displayed", async () => {
    api.loadData = jest.fn().mockReturnValue(data)
    render(
      <DataProvider>
        <Home />
      </DataProvider>
    )
    const footerElement = await screen.findByTestId("footer-testid")
    expect(footerElement).toBeInTheDocument()
  })
  it("an event card, with the last event, is displayed", async () => {
    const today = new Date()
    let last = null
    last = LastEvent(data.events, today)
    render(
      <EventCard
        imageSrc={last.cover}
        title={last.title}
        date={new Date(last.date)}
        small
        label="boom"
      />
    )
    const eventCardImage = screen.getByTestId("card-image-testid")
    expect(eventCardImage).toHaveAttribute(
      "src",
      "/images/alexandre-pellaes-6vAjp0pscX0-unsplash.png"
    )
    await screen.findByText("User&product MixUsers")
    await screen.findByText("avril")
  })
})
