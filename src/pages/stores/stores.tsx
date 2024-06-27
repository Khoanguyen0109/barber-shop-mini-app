import React, { useCallback, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useRecoilValue } from "recoil";
import { Box, Header, Input, Page } from "zmp-ui";
import { storesSelector } from "../../state/store";
import StoreItem from "../../components/store-item";
import debounce from "lodash/debounce";
import { TStore } from "../../types/store";

type Props = {};

const normalizeString = (str) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
};

function Stores({}: Props) {
  const stores = useRecoilValue(storesSelector);
  const [inputValue, setInputValue] = useState("");

  const [filteredResults, setFilteredResults] = useState<TStore[]>(stores);

  const handleFilter = (value) => {
    const normalizedValue = normalizeString(value);
    if (normalizedValue) {
      const results = stores.filter(
        (item) =>
          normalizeString(item.name).includes(normalizedValue) ||
          normalizeString(item.fullAddress).includes(normalizedValue)
      );
      setFilteredResults(results);
    } else {
      setFilteredResults(stores);
    }
  };

  const debouncedFilter = useCallback(debounce(handleFilter, 300), []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedFilter(value);
  };

  return (
    <Page className="flex flex-col bg-white ">
      <Header title="Tìm kiếm" />
      <Box p={4} className="bg-white flex sticky ">
        <Input.Search
          value={inputValue}
          className="flex-1"
          placeholder="Tìm kiếm chi nhánh, dịch vụ"
          onChange={handleChange}
        />
        <Box className="p-2 ml-2 w-12 h-12 text-lg flex items-center justify-center bg-[#FF6602] text-white rounded-lg">
          <CiSearch size={28} />
        </Box>
      </Box>

      <Box className="mt-4 p-4">
        {filteredResults.map((store) => (
          <StoreItem key={store.id} store={store} clickAble={true} />
        ))}
      </Box>
    </Page>
  );
}

export default Stores;
