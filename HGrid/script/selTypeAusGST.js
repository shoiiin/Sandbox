         ﻿
    $(document).ready(function () {
            ApplyStylesToEmptyRecords();

        $('.form .record input').focus(function(){
            ApplyStylesToEmptyRecords();
            $(this).closest('.form .record').removeClass('empty');
        });

        $('.form .record select').focus(function(){
            ApplyStylesToEmptyRecords();
            $(this).closest('.form .record').removeClass('empty');
        });

        $('.form .record input').keypress(function(){
            ApplyStylesToEmptyRecords();
        });

        $('.form .record input').blur(function(){
            ApplyStylesToEmptyRecords();
        });

        function ApplyStylesToEmptyRecords(){
            $('.userFields .record').each(function(){
                if($(this).find('input').val()){
                    $(this).removeClass('empty');
                }else{
                    $(this).addClass('empty');
                }
            });
        }

    });