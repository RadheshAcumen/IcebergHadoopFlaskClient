const MainLayout = ({ children }) => {
  return (
    <div className="shadow-custom-soft p-5 rounded-lg bg-background text-darkText h-full">
      {children}
    </div>
  );
};

export default MainLayout;