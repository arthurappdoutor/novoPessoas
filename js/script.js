/*
Template Name: Dactorapp - Doctor Appointment Booking Mobile Template
Author: Askbootstrap
Author URI: https://themeforest.net/user/askbootstrap
Version: 0.1
*/

/*
- Sidebar
- Landing Page
- Homepage
- Video Page
*/

(function ($) {
    "use strict"; // Start of use strict

    // Sidebar
    var $main_nav = $('#main-nav');
    var $toggle = $('.toggle');

    var defaultOptions = {
        disableAt: false,
        customToggle: $toggle,
        levelSpacing: 40,
        navTitle: 'Dactorapp',
        levelTitles: true,
        levelTitleAsBack: true,
        pushContent: '#container',
        insertClose: 2
    };
    var Nav = $main_nav.hcOffcanvasNav(defaultOptions);

    // Landing Page
    $('.landing-slider').slick({
        dots: true,
        autoplay: true,
        nextArrow: false,
        prewArrow: false,
    });

    // Homepage
    $('.top-doctors').slick({
        infinite: false,
        dots: false,
        arrows: false,
        speed: 300,
        autoplay: false,
        slidesToShow: 2.2,
        slidesToScroll: 1,
    });

    $('.available-doctor').slick({
        infinite: false,
        dots: false,
        arrows: false,
        speed: 300,
        autoplay: false,
        slidesToShow: 1.2,
        slidesToScroll: 1,
    });

    // Video Page
    $('.recent-doctors').slick({
        infinite: false,
        dots: false,
        arrows: false,
        speed: 300,
        autoplay: false,
        slidesToShow: 2.2,
        slidesToScroll: 1,
    });

})(jQuery);


//CEP

$(document).ready(function() {
    function limpa_formulário_cep() {
        // Limpa valores do formulário de cep.
        $("#rua").val("");
        $("#neighbor").val("");
        $("#city").val("");
        $("#state").val("");
    }

    //Quando o campo cep perde o foco.
    $("#cep").blur(function() {
        //Nova variável "cep" somente com dígitos.
        var cep = $(this).val().replace(/\D/g, "");

        //Verifica se campo cep possui valor informado.
        if (cep != "") {
            //Expressão regular para validar o CEP.
            var validacep = /^[0-9]{8}$/;

            //Valida o formato do CEP.
            if (validacep.test(cep)) {
                //Preenche os campos com "..." enquanto consulta webservice.
                $("#rua").val("...");
                $("#neighbor").val("...");
                $("#city").val("...");
                $("#state").val("...");

                //Consulta o webservice viacep.com.br/
                $.getJSON(
                    "https://viacep.com.br/ws/" + cep + "/json/?callback=?",
                    function(dados) {
                        if (!("erro" in dados)) {
                            //Atualiza os campos com os valores da consulta.
                            $("#rua").val(dados.logradouro);
                            $("#neighbor").val(dados.bairro);
                            $("#city").val(dados.localidade);
                            $("#state").val(dados.uf);
                        } //end if.
                        else {
                            //CEP pesquisado não foi encontrado.
                            limpa_formulário_cep();
                            alert("CEP não encontrado.");
                        }
                    }
                );
            } //end if.
            else {
                //cep é inválido.
                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } //end if.
        else {
            //cep sem valor, limpa formulário.
            limpa_formulário_cep();
        }
    });
});