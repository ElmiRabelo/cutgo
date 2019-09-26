//responsavel por enviar o user logado ao dashboard caso tente acessar pagina de login e cadastro
//caso exista uma session e user logado, redireciona para dashboard, caso não, segue com o fluxo
module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    return res.redirect("/app/dashboard");
  }
  return next();
};
