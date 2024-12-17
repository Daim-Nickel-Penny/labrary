import { DensityCard } from "~/components/DensityCard";
import { DimensionCard } from "~/components/DimensionCard";
import { MassCard } from "~/components/MassCard";
import { MaterialFractionCard } from "~/components/MaterialFractionCard";
import { MgMassCard } from "~/components/MgMassCard";
import { ThicknessCard } from "~/components/ThicknessCard";
import { AppSidebar } from "~/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";

export default function HomePage() {
  return (
    //show a 2 row grid with a left and right column and centered cells
    <SidebarProvider
      style={
        {
          "--sidebar-width": "350px",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <header className="sticky top-0 z-10 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden select-none md:block">
                <BreadcrumbLink href="#">Your Research Tools</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Porosity Calculator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 md:grid-cols-3">
          <ThicknessCard />
          <MassCard />
          <DimensionCard />
          <MaterialFractionCard />
          <DensityCard />
          <MgMassCard />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
