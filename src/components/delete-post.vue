<template>
    <div id='form_delete_post' class='form_delete_post'>
        <div class='headerPopup'>
            <h4>Se eliminará este post</h4>
        </div>
        <div class="box-input">
            <p>${coment}</p>
        </div>
        <div class="contain-button-search">
            <button type="button" name="button" class='publicar-cancelar' id="hide_form_search">Cancelar</button>
            <button type="button" name="button" data-posts='${uidPost}' class="delete-post">Eliminar</button>
        </div>
    </div>
</template>
