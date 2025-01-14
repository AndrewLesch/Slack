import { render, screen } from "@testing-library/react";
import { SidebarItem } from "@/app/workspace/[workspaceId]/sidebar-item";
import { useWorkspaceId } from "@/hooks/use-workspace-id";

// Мок хука useWorkspaceId
jest.mock("@/hooks/use-workspace-id", () => ({
  useWorkspaceId: jest.fn(),
}));

// Мок иконки
const MockIcon = () => <div data-testid="mock-icon">Icon</div>;

describe("SidebarItem", () => {
  const mockUseWorkspaceId = useWorkspaceId as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseWorkspaceId.mockReturnValue("mockWorkspaceId");
  });

  it("renders the label and icon correctly", () => {
    render(<SidebarItem label="Channel Name" id="123" icon={MockIcon} />);

    // Проверяем, что текст метки отобразился
    expect(screen.getByText("Channel Name")).toBeInTheDocument();

    // Проверяем, что иконка отобразилась
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("generates the correct href for the link", () => {
    render(<SidebarItem label="Channel Name" id="123" icon={MockIcon} />);

    // Проверяем, что ссылка корректно сгенерирована
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/workspace/mockWorkspaceId/channel/123");
  });

  it("applies the correct styles based on the variant", () => {
    const { container: defaultVariant } = render(
      <SidebarItem label="Default" id="1" icon={MockIcon} />,
    );

    // Проверяем стили для варианта "default"
    expect(defaultVariant.firstChild).toHaveClass("text-[#f9edffcc]");

    const { container: activeVariant } = render(
      <SidebarItem label="Active" id="2" icon={MockIcon} variant="active" />,
    );

    // Проверяем стили для варианта "active"
    expect(activeVariant.firstChild).toHaveClass("text-[#481349] bg-white/90");
  });

  it("uses workspaceId from useWorkspaceId hook", () => {
    mockUseWorkspaceId.mockReturnValue("mockWorkspaceId");

    render(<SidebarItem label="Channel Name" id="123" icon={MockIcon} />);
    const link = screen.getByRole("link");

    // Проверяем, что workspaceId используется корректно
    expect(link).toHaveAttribute("href", "/workspace/mockWorkspaceId/channel/123");
  });

  it("renders without label gracefully", () => {
    render(<SidebarItem label="" id="123" icon={MockIcon} />);

    // Проверяем, что иконка все равно отобразилась
    expect(screen.getByTestId("mock-icon")).toBeInTheDocument();
  });

  it("renders without icon gracefully", () => {
    render(<SidebarItem label="Channel Name" id="123" icon={MockIcon} />);

    // Проверяем, что текст метки отобразился
    expect(screen.getByText("Channel Name")).toBeInTheDocument();
  });
});
