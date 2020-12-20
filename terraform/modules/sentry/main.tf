variable "organization"{
  type = string
  default = "wawo"
}
variable "app_name" {
  type = string
  default = "wawo"
}
variable "team_name" {
  type = string
  default = "wawo"
}
variable "slack_workspace_id" {
  type = string
  default = "37408"
}

# Create a team
resource "sentry_team" "default" {
  organization = var.organization
  name = var.team_name
  slug = var.team_name
}

# Create a project
resource "sentry_project" "default" {
  depends_on = [sentry_team.default]
  organization = var.organization
  team     = var.team_name
  name     = var.app_name
  slug     = var.app_name
}

# Create a key
data "sentry_key" "default" {
  depends_on = [sentry_project.default]
  organization = var.organization
  project = var.app_name
  name = "Default"
}


output "sentry_dsn" {
  value = data.sentry_key.default.dsn_public
}
output "sentry_org" {
  value = var.organization
}
output "sentry_project" {
  value = sentry_project.default.slug
}
