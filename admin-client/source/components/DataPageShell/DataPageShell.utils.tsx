import dynamic from 'next/dynamic';
import { IUpdateFormsProps } from 'components/EntityUpdationDialogs/types';
import { capitalizeFirstLetter } from 'utils/index';

const getCreationFormDynamically = (name: string) =>
  dynamic(() => import(`components/EntityCreationDialogs/${name}`));

const getUpdationFormDynamically = (name: string) =>
  dynamic<IUpdateFormsProps>(
    () => import(`components/EntityUpdationDialogs/${name}`)
  );

export const LoadEntityCreationForm = (entityName: string): JSX.Element => {
  const CreationForm = getCreationFormDynamically(
    capitalizeFirstLetter(entityName)
  );

  return <CreationForm />;
};

export const LoadEntityUpdationForm = (
  entityName: string,
  dataToUpdate: any
): JSX.Element => {
  const UpdationForm = getUpdationFormDynamically(
    capitalizeFirstLetter(entityName)
  );

  return <UpdationForm dataToUpdate={dataToUpdate} />;
};
