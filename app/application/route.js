import Route from '@ember/routing/route';
import $ from "jquery";
import { run } from "@ember/runloop";

export default Route.extend({
    setupController: function(controller, model) {
        $.ajax({
            type: "GET",
            url: "database/Emoji.json"
        }).then((response) => {
            run(() => controller.set("emoji", response));
        });

        $.ajax({
            type: "GET",
            url: "database/EmojiCode.json"
        }).then((response) => {
            run(() => controller.set("emojiCode", response));
        });

        $.ajax({
            type: "GET",
            url: "database/Presentation.json"
        }).then((response) => {
            run(() => controller.set("presentation", response));
        });

        $.ajax({
            type: "GET",
            url: "database/Question.json"
        }).then((response) => {
            run(() => controller.set("question", response));
        });

        $.ajax({
            type: "GET",
            url: "database/Response.json"
        }).then((response) => {
            run(() => controller.set("response", response));
        });

        $.ajax({
            type: "GET",
            url: "database/Star.json"
        }).then((response) => {
            run(() => controller.set("star", response));
        });

        $.ajax({
            type: "GET",
            url: "database/StudentListener.json"
        }).then((response) => {
            run(() => controller.set("studentListener", response));
        });

        $.ajax({
            type: "GET",
            url: "database/StudentPresenter.json"
        }).then((response) => {
            run(() => controller.set("studentPresenter", response));
        });

        $.ajax({
            type: "GET",
            url: "database/TableOfContents.json"
        }).then((response) => {
            run(() => controller.set("tableOfContents", response));
        });

        $.ajax({
            type: "GET",
            url: "database/Tag.json"
        }).then((response) => {
            run(() => controller.set("tag", response));
        });

        $.ajax({
            type: "GET",
            url: "database/Vote.json"
        }).then((response) => {
            run(() => controller.set("vote", response));
        });
    }
});
