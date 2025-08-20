import { AdminSidebar } from "@/components/Admin";
import { LoadingView } from "@/components/LoadingView/LoadingView";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  const [gridReady, setGridReady] = useState(false);
  useEffect(() => {
    const registerModules = async () => {
      const {
        ModuleRegistry,
        ClientSideRowModelModule,
        PaginationModule,
        TextFilterModule,
        NumberFilterModule,
        LocaleModule,
        RowSelectionModule,
        TextEditorModule,
        SelectEditorModule,
        NumberEditorModule,
      } = await import("ag-grid-community");

      ModuleRegistry.registerModules([
        ClientSideRowModelModule,
        PaginationModule,
        TextFilterModule,
        NumberFilterModule,
        LocaleModule,
        RowSelectionModule,
        TextEditorModule,
        SelectEditorModule,
        NumberEditorModule,
      ]);

      setGridReady(true);
    };

    registerModules();
  }, []);

  if (!gridReady) return <LoadingView message="Cargando grillas..." />;

  return (
    <div>
      <AdminSidebar />
      {children}
    </div>
  );
};
