Vagrant.configure("2") do |config|
  config.vm.define :web do |web|
    web.vm.box = "hashicorp/precise32"
    #web.vm.box_url = "http://files.vagrantup.com/precise64.box"
    #web.vm.network :private_network, ip: "192.168.60.10"
    web.berkshelf.enabled = true

    web.vm.provision :shell, :inline => "gem install chef --version 11.4.2 --no-rdoc --no-ri --conservative"

    web.vm.provision :chef_solo do |chef|
      chef.add_recipe "apt"
      chef.add_recipe "quickdocs"
   end
  end
end