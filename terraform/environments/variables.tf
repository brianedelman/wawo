variable "aws_profile" {
  default = "wawo"
}
variable "aws_region" {
  default = "us-east-1"
}
variable "heroku_team" {
  description = "Name of the Team (must already exist)"
  default ="wawo"
}
variable "app_name" {
  description = "base name of the application"
  default = "wawo"
}
variable "SENTRY_AUTH_TOKEN" {
  description = "sentry_auth_token"
}
