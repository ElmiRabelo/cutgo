//controla o acesso a dashboard somente para users logados(autenticados)
//caso não exista uma session e/ou um user, a pessoa é redirecionada para pagina inicial caso tente acessar o dashboard

module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    //toda view da minha app poderá usar user que é igual ao user da session(o user autenticado)
    res.locals.user = req.session.user;

    return next();
  }

  return res.redirect("/");
};
