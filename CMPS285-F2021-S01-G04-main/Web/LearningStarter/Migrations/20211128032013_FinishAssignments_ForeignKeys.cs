using Microsoft.EntityFrameworkCore.Migrations;

namespace LearningStarterServer.Migrations
{
    public partial class FinishAssignments_ForeignKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AssignmentId",
                table: "AssignmentQuestions",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "AssignmentQuestionId",
                table: "AssignmentAnswers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_AssignmentQuestions_AssignmentId",
                table: "AssignmentQuestions",
                column: "AssignmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AssignmentAnswers_AssignmentQuestionId",
                table: "AssignmentAnswers",
                column: "AssignmentQuestionId");

            migrationBuilder.AddForeignKey(
                name: "FK_AssignmentAnswers_AssignmentQuestions_AssignmentQuestionId",
                table: "AssignmentAnswers",
                column: "AssignmentQuestionId",
                principalTable: "AssignmentQuestions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AssignmentQuestions_Assignments_AssignmentId",
                table: "AssignmentQuestions",
                column: "AssignmentId",
                principalTable: "Assignments",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AssignmentAnswers_AssignmentQuestions_AssignmentQuestionId",
                table: "AssignmentAnswers");

            migrationBuilder.DropForeignKey(
                name: "FK_AssignmentQuestions_Assignments_AssignmentId",
                table: "AssignmentQuestions");

            migrationBuilder.DropIndex(
                name: "IX_AssignmentQuestions_AssignmentId",
                table: "AssignmentQuestions");

            migrationBuilder.DropIndex(
                name: "IX_AssignmentAnswers_AssignmentQuestionId",
                table: "AssignmentAnswers");

            migrationBuilder.DropColumn(
                name: "AssignmentId",
                table: "AssignmentQuestions");

            migrationBuilder.DropColumn(
                name: "AssignmentQuestionId",
                table: "AssignmentAnswers");
        }
    }
}
