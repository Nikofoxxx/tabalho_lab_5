function pagina_principal(){
	window.location = '../pagina_inicial/pagina_inicial.html';	
}
function empresas(){
	window.location = '../pagina_empresas/index.html';
}
function buscar_emitentes(){
    window.location = '../pagina_consulta_emitente/index.html';
}
function funcionarios(){

	window.location = '../pagina_funcionarios/index.html';
}
function buscar_funcionarios(){
	window.location = '../pagina_consulta_funcionarios/index.html';
}
function folha(){
	window.location = '../pagina_folha/index.html';
}
function segunda_via(){
  window.location = '../pagina_segunda_via/index.html';
}

function pagina_recibo(){
  window.location = '../pagina_recibo/index.html';
}

function relatorio(){
    window.location = '../pagina_relatorio_gerencial/index.html';
}
function senha(){
     window.location = '../pagina_editar_senha/index.html';
}
function suporte(){
	alert(' FNS Developers emails de contato:\nnicolashenrique2@hotmail.com\nfrancielegarcia38@yahoo.com.br\nsbaneto@yahoo.com.br')
}
function login(){
	if(confirm('Você tem certeza que quer sair do sistema?'))
		window.location = '../index.html';
	//else (alert('OK, esta janela não será fechada ainda.'))
}

function buscar_funcionarios(){
    $.getJSON('php/buscar_funcionario.php', function (dados){
       if (dados.length > 0){   
        var option = '<option value="">Selecione o Funcinário...</option>';
        $.each(dados, function(i, obj){
          option += '<option value="'+obj.id+'">'+obj.nome+'</option>';
        })
        $('#combobox_funcionarios').html(option).show();
       }else{
         Reset();
       }
    });
  }

function campos(){
  if($("#campo_competencia").val() == "" || $("#campo_dias_uteis").val() == "" || $("#campo_fds").val() == "" || $("#campo_hora_extra_normal").val() == "" || $("#campo_hora_extra_fds").val() == "" || $("#campo_falta_normal").val() == "" || $("#campo_falta_fds").val() == "" || $("#campo_add_noturno").val() == "" || $("#campo_dependentes").val() == "" || $("#campo_adiantamento").val() == ""){
    alert('Por favor, preencha todos os campos!');
  }else{
    validar_funcionario();
  }
}

function validar_funcionario(){
  $.getJSON('php/buscar_funcionario.php', function (dados){
       if (dados.length < 1){   
        alert('Não existe nenhum funcionário cadastrado no sistema!');
       }else{
        validar_emitente();
       }
    });
  }

function validar_emitente(){
 $.getJSON('php/buscar_emitente.php', function (dados){
       if (dados.length < 1){   
        alert('Não existe nenhum emitente cadastrado no sistema!');
       }else{
        validar_combobox();
       }
    });
}

function validar_combobox(){
  if($("#combobox_funcionarios option:selected").text()=="Selecione o Funcinário..."){
      alert('Por Favor, Selecione um Funcionário!');
  }else{
    gerar_folha();
  }
}

function gerar_folha(){
 
    //dados a enviar, vai buscar os valores dos campos que queremos enviar para a BD
    var dadosajax = {
      
          'competencia' : $("#campo_competencia").val(),     
      	  'funcionario' : $("#combobox_funcionarios option:selected").text(),
	      'dias_uteis' : $("#campo_dias_uteis").val(),
	      'fds' : $("#campo_fds").val(),
	      'hora_extra_normal' : $("#campo_hora_extra_normal").val(),	      
	      'hora_extra_fds' : $("#campo_hora_extra_fds").val(),	      
	      'falta_normal' : $("#campo_falta_normal").val(),
	      'falta_fds' : $("#campo_falta_fds").val(),
	      'add_noturno' : $("#campo_add_noturno").val(),
	      'dependentes' : $("#campo_dependentes").val(),
	      'adiantamento' : $("#campo_adiantamento").val(),
    };
    pageurl = 'php/gerar_folha.php';
    //para consultar mais opcoes possiveis numa chamada ajax
    //http://api.jquery.com/jQuery.ajax/
    $.ajax({
 
        //url da pagina
        url: pageurl,
        //parametros a passar
        data: dadosajax,
        //tipo: POST ou GET
        type: 'POST',
        //cache
        cache: false,
        //se ocorrer um erro na chamada ajax, retorna este alerta
        //possiveis erros: pagina nao existe, erro de codigo na pagina, falha de comunicacao/internet, etc etc etc
        error: function(){
            alert('Erro: Inserir Registo!!');
        },
        //retorna o resultado da pagina para onde enviamos os dados
        success: function(result)
        { 
            //se foi inserido com sucesso
            if($.trim(result) != '1')
            {
			   alert("Folha Gerada com sucesso!");
               document.getElementById('campo_competencia').value="";
               document.getElementById('campo_dias_uteis').value="";
               document.getElementById('campo_fds').value="";
               document.getElementById('campo_hora_extra_normal').value="";
               document.getElementById('campo_hora_extra_fds').value="";
               document.getElementById('campo_falta_normal').value="";
               document.getElementById('campo_falta_fds').value="";
               document.getElementById('campo_add_noturno').value="";
               document.getElementById('campo_dependentes').value="";
               document.getElementById('campo_adiantamento').value="";

               pagina_recibo();
            }
            //se foi um erro
            else
            {
             alert("Não foi possível gerar a folha!");
               document.getElementById('campo_competencia').value="";
               document.getElementById('campo_dias_uteis').value="";
               document.getElementById('campo_fds').value="";
               document.getElementById('campo_hora_extra_normal').value="";
               document.getElementById('campo_hora_extra_fds').value="";
               document.getElementById('campo_falta_normal').value="";
               document.getElementById('campo_falta_fds').value="";
               document.getElementById('campo_add_noturno').value="";
               document.getElementById('campo_dependentes').value="";
               document.getElementById('campo_adiantamento').value="";
            }
 
        }
    });
}


