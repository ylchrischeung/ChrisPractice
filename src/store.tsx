import { create } from 'zustand'

type State = {
  selectedItem: number;
  itemList: string[];
  addItemList: (item: string) => void;
  removeAllItem: () => void;
  removeItem: (item: string) => void;
};

//create a new store as declared type of <State>
export const useStore = create<State>(set => ({
  selectedItem: 0,
  itemList: [],
  addItemList: (item: string) => set(state => ({ 
    selectedItem: state.selectedItem + 1 , 
    itemList: [...state.itemList, item] 
  })),
  removeAllItem: () => set({ selectedItem: 0, itemList: [] }),
  removeItem: (item: string) => {
    set(state => {
      var list = [...state.itemList];
      var index = list.indexOf(item);

      if (index !== -1){
        list.splice(index, 1);
        return { selectedItem: state.selectedItem - 1 , itemList: list };
      }
      
      return state;
    });
  }
}));
