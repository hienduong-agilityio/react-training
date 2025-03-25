import UserInfromation from "./UserInfromation";

// export default function Sidebar({ userData }: ISidebarContextExample) {
export default function Sidebar() {
  return (
    <div
      className="sidebar"
      style={{
        backgroundColor: "rgb(228, 228, 228)",
        padding: 10,
        gridColumn: "1 / 2",
        gridRow: "1 / 3",
      }}
    >
      <h2>Sidebar</h2>
      {/* <UserInfromation userData={userData} /> */}
      <UserInfromation />
    </div>
  );
}
