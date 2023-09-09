import { createFactory } from '@withease/factories';
import { Event, createEvent, createStore, sample } from 'effector';

interface Config<Item> {
  take: number;
  fetchItems: Event<{ skip: number; take: number; }>;
  itemsFetched: Event<{ items: Item[]; count: number; }>;
}

export const createInfiniteScrollModel = createFactory(<Item>({
  take,
  fetchItems,
  itemsFetched,
}: Config<Item>) => {
  const $items = createStore<Item[]>([]);
  const $totalCount = createStore(0);
  const $isMaxItemsCount = createStore(false);
  const loadMoreItems = createEvent();
  const loadInitialItems = createEvent();
  const addExtraItem = createEvent<Item>();
  const $skip = createStore(0);

  sample({
    clock: loadInitialItems,
    source: [$skip],
    fn: ([skip]) => ({ skip, take }),
    target: fetchItems,
  });

  sample({
    clock: loadMoreItems,
    source: $skip,
    filter: $isMaxItemsCount.map((x) => !x),
    fn: (skip) => ({ skip, take }),
    target: fetchItems,
  });

  sample({
    clock: itemsFetched,
    fn: ({ count }) => count,
    target: $totalCount,
  });

  sample({
    clock: itemsFetched,
    source: $items,
    fn: (oldItems, { items }) => [...oldItems, ...items],
    target: $items,
  });

  sample({
    clock: itemsFetched,
    source: $skip,
    fn: (skip) => skip + take,
    target: $skip,
  });

  sample({
    clock: $items,
    source: [$totalCount],
    fn: ([totalCount], items) => {
      return items.length === totalCount;
    },
    target: $isMaxItemsCount,
  });

  sample({
    clock: addExtraItem,
    fn: () => false,
    target: $isMaxItemsCount,
  });

  sample({
    clock: addExtraItem,
    source: $totalCount,
    fn: (count) => count + 1,
    target: $totalCount,
  });

  sample({
    clock: addExtraItem,
    source: $items,
    fn: (items, item) => ([item, ...items]),
    target: $items,
  });

  sample({
    clock: addExtraItem,
    source: $skip,
    fn: (skip) => skip + 1,
    target: $skip,
  });

  return {
    $items,
    $isMaxItemsCount,
    $totalCount,
    loadMoreItems,
    loadInitialItems,
    addExtraItem,
  };
});
