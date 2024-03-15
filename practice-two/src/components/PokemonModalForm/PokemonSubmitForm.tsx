import Button from '@components/common/Button';
import { POKEMON_URL } from '@constants/api';
import { deleteData } from '@services/api';
import { usePokemonContext } from '@stores/PokemonProvider';

const PokemonSubmitForm = () => {
  const { state, dispatch } = usePokemonContext();

  const handleButtonConfirmDelete = async () => {
    dispatch({
      type: 'DELETE_POKEMON_REQUEST'
    });

    try {
      await deleteData(`${POKEMON_URL}${state.pokemonID}`);

      dispatch({ type: 'DELETE_POKEMON_SUCCESS' });
    } catch (error) {
      dispatch({
        type: 'DELETE_POKEMON_ERROR',
        payload: (error as Error).message
      });
    }

    dispatch({
      type: 'UPDATE_POKEMON_FORM_TITLE',
      payload: 'Create'
    });
  };

  const handleButtonClosePopup = () => {
    dispatch({
      type: 'UPDATE_POKEMON_FORM_TITLE',
      payload: ''
    });
  };

  return (
    <div className="text-center p-10">
      <div className="mx-auto pb-10 w-48">
        <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
        <p className="text-sm text-gray-500">Are you sure you want to delete this item?</p>
      </div>
      <div className="flex gap-4 justify-between">
        <Button onClick={handleButtonConfirmDelete} variant="outline">
          Confirm
        </Button>
        <Button onClick={handleButtonClosePopup} variant="filled" color="danger">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default PokemonSubmitForm;
