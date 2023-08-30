<?php
include_once "./header.php";
?>

<!-- page content -->
<div class="right_col" role="main">
    <!-- top tiles -->
    <div class="row" style="display: block;">
        <div class="tile_count">
            <div class="col-md-2 col-sm-4  tile_stats_count">
                <span class="count_top"><i class="fa fa-user"></i> Tổng đơn hàng trong tháng</span>
                <div class="count green">500</div>
                <span class="count_bottom"><i class="green">4% </i> so với tháng trước</span>
            </div>
        </div>
    </div>
    <!-- /top tiles -->

    <div class="row" style="display: block;">
        <div class="col-md-12 col-sm-12 ">
            <div class="dashboard_graph">

                <div class="row x_title">
                    <div class="col-md-6">
                        <h3>Bill Tracking, <small> Xin Chào!</small></h3>
                    </div>
                    <!-- <div class="col-md-6">
                  <div id="reportrange" class="pull-right"
                    style="background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc">
                    <i class="glyphicon glyphicon-calendar fa fa-calendar"></i>
                    <span>December 30, 2014 - January 28, 2015</span> <b class="caret"></b>
                  </div>
                </div> -->
                </div>

                <div class="col-md-9 col-sm-9 ">
                    <div id="chart_plot_01" class="demo-placeholder"></div>
                </div>
                <div class="col-md-3 col-sm-3  bg-white">
                    <div class="x_title">
                        <h2>Xếp hạng hiệu suất dịch vụ</h2>
                        <div class="clearfix"></div>
                    </div>

                    <div class="col-md-12 col-sm-12 ">
                        <div>
                            <p>Dịch vụ vận chuyển 1</p>
                            <div class="">
                                <div class="progress progress_sm" style="width: 76%;">
                                    <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="80"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Dịch vụ vận chuyển 2</p>
                            <div class="">
                                <div class="progress progress_sm" style="width: 76%;">
                                    <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="60"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 col-sm-12 ">
                        <div>
                            <p>Dịch vụ vận chuyển 3</p>
                            <div class="">
                                <div class="progress progress_sm" style="width: 76%;">
                                    <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="40"></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Dịch vụ vận chuyển 4</p>
                            <div class="">
                                <div class="progress progress_sm" style="width: 76%;">
                                    <div class="progress-bar bg-green" role="progressbar" data-transitiongoal="50"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="clearfix"></div>
            </div>
        </div>

    </div>
    <br />

</div>
<!-- /page content -->

<?php
include_once "./footer.php";
?>