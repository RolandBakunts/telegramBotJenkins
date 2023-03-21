variable "aws_region" {    
    type = string
    default = "us-east-1"
}

variable "cidr-block-vpc" {
    type = string
	default = "10.20.0.0/16"
}

variable "cidr-block-route_tb" {
    type = string
    default = "0.0.0.0/0"
}

variable "name-tag" {
    type = string
    default = "_YVN"
}

variable "owner-tag" {
    type = string
    default = "rbakunts"
}

variable "project-tag" {
    type = string
    default = "2023_internship_YVN"
}

variable "instance-type" {
    type = string
    default = "t2.micro"
}
