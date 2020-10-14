import fetchEntities from './fetchEntities';
import postEntityData from './postEntityData';

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export { fetchEntities, postEntityData };
