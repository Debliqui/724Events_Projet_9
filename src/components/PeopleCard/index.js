import PropTypes from "prop-types"

import "./style.scss"

const PeopleCard = ({ imageSrc, imageAlt, position, name }) => (
  <div className="PeopleCard" data-testid="people-card-testid">
    <div className="PeopleCard__imageContainer">
      <img data-testid="card-image-testid" src={imageSrc} alt={imageAlt} />
    </div>
    <div className="PeopleCard__descriptionContainer">
      <h3 className="PeopleCard__name">{name}</h3>
      <p className="PeopleCard__position">{position}</p>
    </div>
  </div>
)

PeopleCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
}

PeopleCard.defaultProps = {
  imageAlt: "",
}

export default PeopleCard
