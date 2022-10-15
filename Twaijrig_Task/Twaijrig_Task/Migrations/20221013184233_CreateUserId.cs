using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Twaijrig_Task.Migrations
{
    public partial class CreateUserId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserID",
                table: "Customers",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Customers_UserID",
                table: "Customers",
                column: "UserID");

            migrationBuilder.AddForeignKey(
                name: "FK_Customers_AspNetUsers_UserID",
                table: "Customers",
                column: "UserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Customers_AspNetUsers_UserID",
                table: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Customers_UserID",
                table: "Customers");

            migrationBuilder.DropColumn(
                name: "UserID",
                table: "Customers");
        }
    }
}
