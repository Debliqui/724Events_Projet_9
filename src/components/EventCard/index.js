import PropTypes from "prop-types"
import { getMonth } from "../../helpers/Date"

import "./style.scss"

const EventCard = ({
  imageSrc,
  imageAlt,
  date = new Date(),
  title,
  label,
  small = false,
  ...props
}) => (
  <div
    data-testid="card-testid"
    className={`EventCard${small ? " EventCard--small" : ""}`}
    {...props}
  >
    <div className="EventCard__imageContainer">
      <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
      <div className="EventCard__label">{label}</div>
    </div>
    <div className="EventCard__descriptionContainer">
      <h4 className="EventCard__title">{title}</h4>
      <p className="EventCard__month">{getMonth(date)}</p>
    </div>
  </div>
)

EventCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  date: PropTypes.instanceOf(Date).isRequired,
  title: PropTypes.string.isRequired,
  small: PropTypes.bool,
  label: PropTypes.string.isRequired,
}

EventCard.defaultProps = {
  imageAlt: "image",
  small: false,
}

export default EventCard
