import SearchBar from '../../components/ui/search';

export const Home = () => {
  return (
    <main className="w-full flex flex-col items-center justify-center">
      <div className="w-full flex justify-end p-8">
        {' '}
        <SearchBar />
      </div>
    </main>
  );
};
