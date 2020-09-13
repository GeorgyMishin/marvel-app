import React from 'react'
import { Character } from '../../modules/characters'

import './style.scss'

type CharacterItemProps = {
  item: Character
  onViewPress?: (characterId: number) => void
}

const CharacterItem: React.FC<CharacterItemProps> = ({
  item: { name, thumbnail, description, id },
  onViewPress,
}) => (
  <div className="characterItem">
    <img
      alt={name}
      src={`${thumbnail.path}.${thumbnail.extension}`}
      className="characterImage"
    />
    <div className="characterInfoContainer">
      <p className="characterName">Name: {name}</p>
      <p className="characterDescription">
        Description: {description || 'No description'}
      </p>
      <button className="characterViewButton" onClick={() => onViewPress?.(id)}>
        View
      </button>
    </div>
  </div>
)

export default CharacterItem
